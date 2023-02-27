import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import {
  fetchHourlyPreviousDataPerPair,
  fetchMarketDataPerPair,
} from "../../context/cryptoDataReducer";
import { BsQuestionCircleFill } from "react-icons/bs";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import { filterCryptoPairs } from "../../context/cryptoDataReducer";
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

export const CryptoResults = ({ marketPair, markets, isOpen }) => {
  const {
    cryptoPairsPerMarket,
    cryptoPairPriceLoading,
    cryptoHistoryDataLoading,
    cryptoHistoryPerPair,
  } = useSelector((state) => state.cryptoData);
  const [isDetailsOpen, setIsDetailsOpen] = useState(isOpen);
  const [isDescending, setIsDescending] = useState(true);
  let buy;
  let sell;
  if (marketPair) {
    [buy, sell] = marketPair.split(`-`);
  } else {
    [buy, sell] = ["", ""];
  }
  //default buy/sell set an empty string for useEffect Call in case we are not on /{cryptoPair page}

  useEffect(() => {
    if ((!markets && !buy && !sell) || (buy === `` && sell === ``)) {
      return;
    }
    markets.map(async (market) => {
      dispatch(
        await fetchMarketDataPerPair({
          from: buy.toUpperCase(),
          to: sell.toUpperCase(),
          market,
        })
      );

      setModalData((prevState) => [
        ...prevState,
        {
          from: buy,
          to: sell,
          market: market,
        },
      ]);
    });
  }, []);

  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    if (isOpenModal || !modalData) return;
    if (modalData) {
      modalData.map((object) => {
        dispatch(fetchHourlyPreviousDataPerPair(object));
      });
    }
    ///
  }, [isOpenModal, modalData]);
  return (
    <>
      <Modal
        isOpen={isOpenModal || isDetailsOpen}
        style={customStyles}
        ariaHideApp={false}
      >
        <div
          onClick={() => {
            setIsDetailsOpen(!isOpenModal);
            setIsOpenModal(!isOpenModal);
          }}
          className={`cursor-pointer border-2 w-1/5 rounded-full flex justify-center font-bold mb-6`}
        >
          X
        </div>
        {cryptoHistoryDataLoading ? (
          <MoonLoader cssOverride={{ position: `absolute`, top: `50%` }} />
        ) : (
          <div>
            {(cryptoHistoryPerPair || isDetailsOpen || isOpenModal) &&
              cryptoHistoryPerPair.map((el, idx) => {
                return (
                  <div
                    className="flex flex-col font-bold text-center"
                    key={`main-modal-screen-${idx}`}
                  >
                    Trading Data:
                    {Object.keys(el).map((market) => {
                      return el[market].map(({ low, high }, idx) => {
                        return (
                          <div
                            className="flex flex-col gap-2 font-light"
                            key={`element-tradeData-${
                              Object.keys(el[market])[0]
                            }-${idx}`}
                          >
                            <p className="text-red-400">
                              Low: {low.toFixed(4)}
                            </p>
                            <p className="text-green-300">
                              High: {high.toFixed(4)}
                            </p>
                            <div className="w-full border-2 border-black"></div>
                          </div>
                        );
                      });
                    })}
                  </div>
                );
              })}
          </div>
        )}
      </Modal>

      <div className="w-full flex justify-around border-t-8 mt-20 pt-8 pb-8 bg-gradient-to-r from-cyan-500 to-blue-500 flex-wrap gap-2">
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
                className="border-4 lg:w-[20%]  justify-center items-center flex flex-col rounded-md bg-[white] pt-4 pb-4 fadeRightMini"
                key={`${market}-${cryptoPairAndPriceObject}`}
              >
                <p className=" font-bold">{market}</p>

                <div className="flex-row flex justify-between w-[80%] border-2 border-black">
                  <p className=" font-bold flex grow pl-2 ">Pair</p>
                  <div className="font-bold">|</div>
                  <p
                    className={`font-bold flex items-center gap-1 cursor-pointer grow justify-end pr-2 ease-in duration-300 ${
                      isDescending ? `hover:bg-green-500` : `hover:bg-red-400`
                    }`}
                    onClick={() => {
                      setIsDescending(!isDescending);
                      dispatch(filterCryptoPairs(isDescending));
                    }}
                  >
                    Price
                    {isDescending ? <HiSortAscending /> : <HiSortDescending />}
                  </p>
                </div>

                {Object.entries(cryptoPairAndPriceObject).map((el) => {
                  const pair = el[0];
                  const price = el[1];
                  return (
                    <div
                      className="flex justify-between w-[80%] sm:gap-5"
                      key={`${pair}-${[price]}`}
                    >
                      <p
                        className="font-medium cursor-pointer sm:text-xs flex gap-1 items-center"
                        onClick={async () => {
                          let buy = pair.split(`-`)[0];
                          let sell = pair.split(`-`)[1];
                          if (
                            cryptoHistoryPerPair.length <= 0 &&
                            modalData.length <= 0
                          ) {
                            await markets.map(async (market) => {
                              dispatch(
                                fetchMarketDataPerPair({
                                  from: buy.toUpperCase(),
                                  to: sell.toUpperCase(),
                                  market,
                                })
                              );
                              await setModalData((prevState) => [
                                ...prevState,
                                {
                                  from: buy,
                                  to: sell,
                                  market: market,
                                },
                              ]);
                            });
                          } else {
                            await modalData.forEach((object) => {
                              const newObj = {
                                from: buy,
                                to: sell,
                                market: object.market,
                              };
                              dispatch(fetchHourlyPreviousDataPerPair(newObj));
                            });
                          }
                          setIsDetailsOpen(!isDetailsOpen);
                          setIsOpenModal(!isOpenModal);
                        }}
                      >
                        {pair}{" "}
                        <BsQuestionCircleFill title="Click to see Trade Details" />
                      </p>
                      <p className="font-medium text-lg sm:text-xs">${price}</p>
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
