import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { fetchHourlyPreviousDataPerPair } from "../../context/cryptoDataReducer";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const CryptoResults = () => {
  const dispatch = useDispatch();
  const marketName = useLocation().pathname.split("/")[1];

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const {
    cryptoPairsPerMarket,
    error,
    cryptoPairPriceLoading,
    cryptoHistoryDataLoading,
    cryptoHistoryPerPair,
  } = useSelector((state) => state.cryptoData);
  const cryptoData = cryptoPairsPerMarket[marketName];

  useEffect(() => {
    if (!isOpenModal) return;
    dispatch(fetchHourlyPreviousDataPerPair(modalData));
  }, [isOpenModal]);

  return (
    <>
      <Modal isOpen={isOpenModal} style={customStyles}>
        <div onClick={() => setIsOpenModal(!isOpenModal)}>x</div>
        {cryptoHistoryDataLoading ? (
          <MoonLoader />
        ) : (
          (
            (Object.keys(cryptoHistoryPerPair).length > 0 &&
              cryptoHistoryPerPair[marketName] &&
              cryptoHistoryPerPair[marketName][
                `${modalData.from}-${modalData.to}`
              ]) ||
            []
          ).map((item) => {
            const { low, high } = item;
            return (
              <div>
                <p>Low: {low}</p>
                <p>High: {high}</p>
              </div>
            );
          })
        )}
      </Modal>
      <div>{error}</div>
      <table>
        <th className="lg:text-3xl md:text-2xl">{marketName.toUpperCase()}</th>
        {cryptoPairPriceLoading ? (
          <MoonLoader />
        ) : (
          Object.keys(cryptoData || {}).map((key) => {
            return (
              <tr
                onClick={() => {
                  setIsOpenModal(!isOpenModal);
                  setModalData({
                    from: key.split("-")[0],
                    to: key.split("-")[1],
                    market: marketName,
                  });
                }}
              >
                <td>{key}</td>
                <td>{cryptoData[key]}</td>
              </tr>
            );
          })
        )}
      </table>
    </>
  );
};
