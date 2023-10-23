import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiPlus, BiSearch } from "react-icons/bi";
import Table from "../../../components/Table";
import TableAction from "../../../components/TableAction";
import {
  DOWNLOAD_TABLE,
  EDIT_ACTION_TABLE,
  EXCEL_ACTION_TABLE,
  PDF_ACTION_TABLE,
  TRANSFER_ACTION_TABLE,
} from "../../../constants";
import { useMutation, useQuery } from "react-query";
import { GET_ALL_REGIONAL_INNOVATION_QUERY_KEY } from "../../../constans/constans";
import {
  getAllRegionalInnovation,
  getDownlaodFileRegionalInnovation,
} from "../../../services/DatabaseInnovation/regional";
import { useUtilContexts } from "../../../context/Utils";
import Pagination from "../../../components/Pagination";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import FilterOption from "../../../components/FilterOption";
import {
  convertEstimationScore,
  downloadExcelBlob,
  downloadFile,
} from "../../../utils";

const initialParams = {
  page: 0,
  limit: 10,
  q: "",
  tahap: "",
};

const RegionalInnovation = () => {
  const [params, setParams] = React.useState(initialParams);
  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const tableHeader = [
    {
      key: "government_name",
      title: "Nama Pemda",
    },
    {
      key: "innovation_name",
      title: "Nama Inovasi",
    },
    {
      key: "",
      title: "Tahapan Inovasi",
      render: (item) => {
        return item.innovation_phase.toUpperCase();
      },
    },
    {
      key: "innovation_initiator",
      title: "Inisiator",
    },
    {
      key: "trial_time",
      title: "Waktu Uji Coba",
    },
    {
      key: "implementation_time",
      title: "Waktu Penerapan",
    },
    {
      key: "",
      title: "Estimasi Skor Kematangan",
      render: (item) => {
        return convertEstimationScore(item?.innovation_phase);
      },
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const [listFilter, setListFilter] = React.useState([
    {
      name: "Semua",
      value: "all",
    },
    {
      name: "Inisiatif",
      value: "inisiatif",
    },
    {
      name: "Uji Coba",
      value: "uji coba",
    },
    {
      name: "Penerapan",
      value: "penerapan",
    },
  ]);

  const { data, isFetching } = useQuery(
    [params, GET_ALL_REGIONAL_INNOVATION_QUERY_KEY, params],
    getAllRegionalInnovation(params)
  );

  const onHandlePagination = (page) => {
    setParams({
      ...params,
      page: page + 1,
    });
  };

  const onHandleSarch = (event) => {
    if (event.key === "Enter") {
      setParams({
        ...params,
        q: event.target.value,
      });
    }
  };

  const onHandleChangeFilter = (value) => {
    const tempListFilter = listFilter;
    tempListFilter.forEach((item) => {
      if (item.value === value) {
        item.active = true;
      } else {
        item.active = false;
      }
    });

    if (value === "all") {
      setParams({
        params,
        tahap: "",
      });
    } else {
      setParams({
        params,
        tahap: value,
      });
    }

    setListFilter(tempListFilter);
  };

  const downloadExcel = (item) => {
    downloadExcelBlob({
      api: getDownlaodFileRegionalInnovation({ id: item?.id, type: "xlsx" }),
      titleFile: `Detail-Inovasi-${item?.innovation_name}-${new Date().getTime()}`,
      onError: () => {
        alert("Terjadi kesalahan");
      },
    });
  };

  const actionTableData = [
    {
      code: DOWNLOAD_TABLE,
      label: "Dokumentasi Foto",
      onClick: (item) => {
        if (item?.fotoFile) {
          const fullPath = item?.fotoFile?.full_path;
          const fileName = item?.fotoFile?.name.replace(
            item?.fotoFile?.extension,
            ""
          );
          downloadFile(fullPath, fileName);
        } else {
          alert("Dookumen tidak tersedia");
        }
      },
    },
    {
      code: PDF_ACTION_TABLE,
      label: "Anggaran",
      onClick: (item) => {
        if (item?.budgetFile) {
          const fullPath = item?.budgetFile?.full_path;
          const fileName = item?.budgetFile?.name.replace(
            item?.budgetFile?.extension,
            ""
          );
          downloadFile(fullPath, fileName);
        } else {
          alert("Dookumen tidak tersedia");
        }
      },
    },
    {
      code: PDF_ACTION_TABLE,
      label: "Profil Bisnis",
      onClick: (item) => {
        if (item?.profileFile) {
          const fullPath = item?.profileFile?.full_path;
          const fileName = item?.profileFile?.name.replace(
            item?.profileFile?.extension,
            ""
          );
          downloadFile(fullPath, fileName);
        } else {
          alert("Dookumen tidak tersedia");
        }
      },
    },
    {
      code: EXCEL_ACTION_TABLE,
      label: "Excel",
      onClick: (item) => {
        downloadExcel(item);
      },
    },
    {
      code: TRANSFER_ACTION_TABLE,
      label: "Indikator",
      onClick: (item) => {
        navigate(`/inovasi-daerah/${item.id}/indikator`);
      },
    },
    {
      code: EDIT_ACTION_TABLE,
      label: "Edit",
      onClick: (item) => {
        navigate(`/inovasi-daerah/edit/${item.id}`);
      },
    },
  ];

  React.useEffect(() => {
    setLoadingUtil(isFetching);
  }, [isFetching]);

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] text-2xl font-bold">Inovasi Daerah</div>
      <div className="mt-4">
        <FilterOption
          items={listFilter}
          defaultValue="all"
          onFilterChange={(value) => {
            onHandleChangeFilter(value);
          }}
        />
      </div>
      <div className="w-full rounded-lg text-[#333333] bg-white p-6 flex flex-col gap-4">
        <div className="">
          <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%] float-right">
            <BiSearch />
            <input
              type="text"
              className="outline-none"
              placeholder="Pencarian"
              onKeyDown={onHandleSarch}
            />
          </div>
        </div>
        <div className="ml-auto">
          <Button
            text="Tambah Inovasi Daerah"
            icon={<BiPlus size="16" />}
            padding="p-[10px]"
            onClick={() => {
              navigate("/inovasi-daerah/tambah");
            }}
          />
        </div>
      </div>

      <div className="w-full rounded-lg text-[#333333] bg-white p-6">
        <Table
          showNum={true}
          data={data?.data || []}
          columns={tableHeader}
          action={<TableAction data={actionTableData} />}
        />
        <Pagination
          pageCount={data?.pagination?.pages}
          onHandlePagination={onHandlePagination}
          totalData={data?.pagination?.total}
          size={params.limit}
        />
      </div>
    </div>
  );
};

export default RegionalInnovation;
