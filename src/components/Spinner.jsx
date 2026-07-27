import Loader from '../assets/loading.svg?react';
import Modal from './Modal';
export default function Spinner() {
  // return (
  //   <div className="fixed inset-0 grow flex items-center justify-center bg-black/15 backdrop-blur-[3px]">
  //     <Loader className=" max-w-50 max-h-50 w-40 h-40 text-black " />
  //   </div>
  // );
  return (
    <Modal>
      <Loader className=" max-w-50 max-h-50 w-40 h-40 text-black " />
    </Modal>
  );
}
