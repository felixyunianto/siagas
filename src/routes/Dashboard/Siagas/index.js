import React from "react";
import AnnouncementCarousel from "./components/AnnouncementCarousel";
import CardGradient from "../../../components/CardGradient";
import DailyLogin from "./components/DailyLogin";
import InnovationMap from "./components/InnovationMap";
import PemdaLoginList from "./components/PemdaLoginList";
import RegionData from "./components/RegionData";

const Siagas = () => {
  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] text-2xl font-bold">Dashboard SIAGAS</div>
      <div className="flex flex-col gap-6">
        <AnnouncementCarousel />
        <InnovationMap />
        <DailyLogin />
        <PemdaLoginList />
        <div className="grid grid-cols-3 gap-4">
          <CardGradient
            showInfo={true}
            type="primary"
            label="Indeks Rata-Rata Nasional"
            total={48.05}
          />
          <CardGradient
            showInfo={true}
            type="primary"
            label="Indeks Rata-Rata Provinsi"
            total={49.63}
          />
          <CardGradient
            showInfo={true}
            type="primary"
            label="Indeks Rata-Rata Kota"
            total={54.52}
          />
          <CardGradient
            showInfo={true}
            type="primary"
            label="Indeks Rata-Rata Kabupaten"
            total={45.32}
          />
          <CardGradient
            showInfo={true}
            type="primary"
            label="Indeks Rata-Rata Daerah Tertinggal"
            total={32.29}
          />
          <CardGradient
            showInfo={true}
            type="primary"
            label="Indeks Rata-Rata Daerah Perbatasan"
            total={34.51}
          />
        </div>
        <CardGradient
          type="secondary"
          label="Total Inovasi Nasional"
          total={1.61}
        />
        <div className="grid grid-cols-3 gap-4">
          <CardGradient
            showInfo={true}
            type="secondary"
            label="Baru"
            total={1.61}
          />
          <CardGradient
            showInfo={true}
            type="secondary"
            label="Uji Coba"
            total={1.477}
          />
          <CardGradient
            showInfo={true}
            type="secondary"
            label="Penerapan"
            total={23.817}
          />
          <CardGradient
            showInfo={true}
            type="secondary"
            label="Rata-Rata Inovasi Per Daerah"
            total={1.61}
          />
          <CardGradient
            showInfo={true}
            type="secondary"
            label="Skor Tertinggi"
            total={"Kab. Bogor (97.495)"}
          />
          <CardGradient
            showInfo={true}
            type="secondary"
            label="Skor Terendah"
            total={"Kab. Simeulue (0.400)"}
          />
        </div>

        <RegionData />
      </div>
    </div>
  );
};

export default Siagas;
