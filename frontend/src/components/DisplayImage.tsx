import { CgClose } from "react-icons/cg";

interface DisplayImageProps {
  imgUrl: string;
  onClose: () => void;
}

const DisplayImage = ({ imgUrl, onClose }: DisplayImageProps) => {
  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-black/30 z-50">
      <div className="bg-white shadow-lg rounded-2xl max-w-5xl mx-auto p-4">
        <div
          className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <CgClose />
        </div>

        <div className="flex justify-center p-4 max-w-[60vh] max-h-[60vh]">
          <img src={imgUrl} className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
