import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getLanguages = createAsyncThunk(
  "languages/getLanguages",
  async () => {
    const options = {
      method: "GET",
      url: "https://text-translator2.p.rapidapi.com/getLanguages",
      headers: {
        "X-RapidAPI-Key": "39700e946amsh0dd686a2c9deaefp118878jsn64ee8ae08cd2",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
    };
    const res = await axios.request(options);

    return res.data.data.languages.map((lang) => ({
      value: lang.code,
      label: lang.name,
    }));
  }
);
export const getAnswer = createAsyncThunk(
  "translate/getAnswer",
  async (props) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", props.sourceLang.value);
    encodedParams.set("target_language", props.targetLang.value);
    encodedParams.set("text", props.prompt);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "39700e946amsh0dd686a2c9deaefp118878jsn64ee8ae08cd2",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    const res = await axios.request(options);
    console.log(res.data.data.translatedText);
    return res.data.data.translatedText;
  }
);

const initialState = {
  answer: "",
  languages: [],
  isLoading: false,
};

export const translateSlice = createSlice({
  name: "translate",
  initialState,
  extraReducers: {
    [getAnswer.pending]: (state) => {
      state.isLoading = true;
    },
    [getAnswer.fulfilled]: (state, action) => {
      state.answer = action.payload;
      state.isLoading = false;
    },
    [getAnswer.rejected]: (state) => {
      state.isLoading = false;
    },

    [getLanguages.fulfilled]: (state, action) => {
      state.languages = action.payload;
    },
  },
});

export default translateSlice.reducer;

// CreateAsynThunk  da extrareducer şu şekil de de yazılabilir;
// extraReducers: (builder) => {
//   builder.addCase(getAnswer.pending, (state) => {
//     state.isLoading = true;
//   });
//   builder.addCase(getAnswer.fulfilled, (state, action) => {
//     state.answer = action.payload;
//     state.isLoading = false;
//   });
//   builder.addCase(getLanguages.fulfilled, (state, action) => {
//     state.languages = action.payload;
//   });
// };
