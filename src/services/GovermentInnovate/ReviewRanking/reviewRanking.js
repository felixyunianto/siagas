import { BASE_API_URL } from "../../../constans/constans";
import { processResult, throwErrorUtil } from "../../../helpers/fetchingUtils";
import { convertQueryString, getToken } from "../../../utils";

export const getAllReviewRanking = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/innovative_government_award/peringkat_hasil_review?${paramsQueryString}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );

    const result = await response.json();

    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result;
    }

    return [];
  } catch (error) {
    console.log(error);
  }
};

export const updateReviewRanking = async ({ id, nominator }) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/innovative_government_award/peringkat_hasil_review/${id}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getToken().token}`,
        },
        body: JSON.stringify({
          nominator,
        }),
        method: "PATCH",
      }
    );

    const result = await response.json();
    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result;
    }

    throw Error("Error");
  } catch (error) {
    throw error;
  }
};


export const getDownloadReviewRanking = async (payload) => {
  const { type, ...params } = payload;

  const paramsQueryString = convertQueryString(params);

  const url = `${BASE_API_URL}/innovative_government_award/peringkat_hasil_review/download/${type}?${paramsQueryString}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });

    const result = await processResult(response, { downloadMode: true });

    return result;
  } catch (error) {
    throwErrorUtil(error, `${error?.message || error}`);
  }
};