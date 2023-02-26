import { useSelector } from "react-redux";
export const Error = () => {
  const { error } = useSelector((state) => state.cryptoData);
  return (
    <div className={`z-9999 font-bold rounded-full bg-red-400 border-black ${error ? `pt-2 pb-2` : ``} pl-4 pr-4`}>
      {error ? error : ``}
    </div>
  );
};
