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

  
  useEffect(() => {
    if (!isOpenModal) return;
    dispatch(fetchHourlyPreviousDataPerPair(modalData));
  }, [isOpenModal]);

  return (
    <>
      <Modal isOpen={isOpenModal} style={customStyles}>
        <div onClick={() => setIsOpenModal(!isOpenModal)}>x</div>
        {cryptoHistoryDataLoading ? (
          <MoonLoader cssOverride={{ position: `absolute`, top: `50%` }} />
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
      <div
        className={`bg-red-500 ${
          error ? `p-3` : ``
        } rounded-full lg:text-xl md:text-md font-bold sm:text-sm flex flex-wrap`}
      >
        {error}
      </div>
      <div className="w-full flex justify-around border-t-8 mt-20 pt-16 pb-16 bg-gradient-to-r from-cyan-500 to-blue-500 absolute bottom-0">
        {cryptoPairPriceLoading ? (
          <MoonLoader
            cssOverride={{
              position: `absolute`,
              top: `50%`,
              left: `50%`,
              transform: `translate(-50%, 0)`,
            }}
          />
        ) : (
          Object.entries(cryptoPairsPerMarket).map((key) => {
            const market = key[0];
            const cryptoPairAndPriceObject = key[1];

            return (
              <div
                className="border-4 lg:w-[30%]  justify-center items-center flex flex-col rounded-md bg-[white] pt-4 pb-4"
                key={`${market}-${cryptoPairAndPriceObject}`}
              >
                <p className=" font-bold">{market}</p>

                <div className="flex-row flex justify-between w-[80%] ">
                  <p className=" font-bold ">Pair</p>
                  <p className=" font-bold">Price</p>
                </div>

                {Object.entries(cryptoPairAndPriceObject).map((el) => {
                  const pair = el[0];
                  const price = el[1];
                  return (
                    <div
                      className="flex justify-between w-[80%]"
                      key={`${pair}-${[price]}`}
                    >
                      <p
                        className="font-medium"
                        onClick={() => {
                          setIsOpenModal(!isOpenModal);
                          setModalData({
                            from: pair.split("-")[0],
                            to: pair.split("-")[1],
                            market: market,
                          });
                        }}
                      >
                        {pair}
                      </p>
                      <p className="font-medium">${price}</p>
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
