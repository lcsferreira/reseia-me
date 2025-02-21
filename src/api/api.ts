import axios from "axios";
import { apiProtocol, apiUrl, apiVersion } from "./utils";
import AxiosMockAdapter from "axios-mock-adapter";

const buildedUrl = `${apiProtocol}://${apiUrl}${apiVersion}`;

const api = axios.create({
  baseURL: buildedUrl,
});

export const mock = new AxiosMockAdapter(axios, { delayResponse: 1000 });
