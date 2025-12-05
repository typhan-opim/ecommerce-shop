import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

/**
 * 인증이 필요한 경로인지 확인
 */
/** API 경로 접두사 */
 const API_PATHS = {
    PUBLIC: '/api',
    AUTH: '/api/auth',
  } as const;

const isAuthRequired = (url: string): boolean => {
  return url.includes(API_PATHS.AUTH);
};

/**
 * authStore에서 토큰 가져오기
 */
const getToken = (): string | null => {
  const authStore = localStorage.getItem('auth-store');
  const token = authStore ? JSON.parse(authStore).token : null;
  return token;
};

const isTokenExpired = (): boolean => {
  const authStore = localStorage.getItem('auth-store');
  const tokenExpiresAt = authStore ? JSON.parse(authStore).expiresAt : null;
  if (!tokenExpiresAt) return true;
  // 30 giây buffer để tránh token hết hạn giữa request
  const buffer = 30; // giây
  const now = Math.floor(Date.now() / 1000);
  return now >= (parseInt(tokenExpiresAt) - buffer);
};

/**
 * 요청 인터셉터 설정
 */
export const setupRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // 인증이 필요한 경로인지 확인
      if (config.url && isAuthRequired(config.url)) {
        const token = getToken();

        if (!token) {
          // 토큰이 없으면 로그인 페이지로 리다이렉트
          throw new Error('Authentication required');
        }

        // 토큰이 만료되었거나 곧 만료될 경우 갱신 시도
        if (isTokenExpired()) {
          throw new Error('Token refresh failed');
          
        } else {
          config.headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${token}`,
          } as any;
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

/**
 * 응답 인터셉터 설정
 */
export const setupResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean });

      // 401 에러 처리 (토큰 만료)
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // 인증이 필요한 요청이었다면 토큰 갱신 시도
        if (originalRequest.url && isAuthRequired(originalRequest.url)) {
          localStorage.removeItem('auth-store');
        }
      }

      // 에러 응답 표준화
      const errorResponse: any = {
        success: false,
        message: error.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다.',
        error: error.response?.data?.error || error.message,
        code: error.response?.data?.code,
        details: error.response?.data?.details,
      };

      return Promise.reject(errorResponse);
    }
  );
};

// 토큰 관리 유틸리티 내보내기
export { getToken };
