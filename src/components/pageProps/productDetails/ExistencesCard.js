import React from "react";

const ExistencesCard = ({ item }) => {
  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="col-span-10 mdl:col-span-7 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-3/5 items-center text-lg font-normal px-2">
          {item.sucursal}
        </div>
        <div className="flex w-2/5 items-center text-lg font-normal">
          {item.existencias}
        </div>
      </div>
    </div>
  );
};

export default ExistencesCard;
