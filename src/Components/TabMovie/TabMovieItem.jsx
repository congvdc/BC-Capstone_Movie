import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { rapServ } from '../../services/rapServices';
import moment from 'moment';
const TabMovieItem = ({ maHeThongRap }) => {
  const [lichChieu, setLichChieu] = useState([]);
  useEffect(() => {
    rapServ
      .getAllLichChieuHeThong(maHeThongRap)
      .then((res) => {
        console.log(res);
        setLichChieu(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maHeThongRap]);

  const renderTabMovieItem = () => {
    // lichChieu[0]? có nghĩa là nếu phần tử đầu tiên của mảng có thì mới .lstCumRap và map
    return lichChieu[0]?.lstCumRap.map((item, index) => {
      return {
        label: (
          <div className="text-left w-60">
            <p>{item.tenCumRap}</p>
            <p className="truncate ...">{item.diaChi}</p>
          </div>
        ),
        key: index,
        children: (
          <div className="space-y-5">
            {item.danhSachPhim.map((item, index) => {
              if (item.dangChieu) {
                return (
                  <div className="flex" key={index}>
                    <div className="w-2/1 flex p-5 relative">
                      <img src={item.hinhAnh} alt="" className='w-32 h-52'/>
                    </div>
                    <div className="w-8/12 py-0 px-5 max-w-xl">
                      <h3 className='my-5 leading-6 text-lg font-medium -tracking-wide m-0'>
                        <span className='text-white inline-block py-0 w-8 bg-orange-500 text-center mr-2 '>C18</span>
                        {item.tenPhim}
                        </h3>
                      <div className="flex flex-wrap">
                        {item.lstLichChieuTheoPhim
                          .slice(0, 5)
                          .map((suatChieu, index) => {
                            return (
                              <p
                                key={index}
                                // className="w-1/2 border border-black rounded-md py-2 px-4 mb-5"
                                className="decoration-gray-500 w-2/5 border-solid border-2 rounded-md mb-4 mr-4 p-2 bg-slate-200"
                              >
                                {moment(suatChieu.ngayChieuGioChieu).format(
                                  'DD/MM/YYYY, h:mm'
                                )}
                              </p>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ),
      };
    });
  };

  return (
    <Tabs
      tabPosition="left"
      style={{ maxHeight: '400px', overflowY: 'scroll' }}
      items={renderTabMovieItem()}
    />
  );
};

export default TabMovieItem;
