import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  ChakraProvider,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiFile } from "react-icons/fi";
import * as converter from "@tmcw/togeojson";

import type { GpxModel } from "../../lambda/models/gpx";

import { Map } from "../Map";
import { FileUploader } from "../FileUploader";
import { GET_GPXS, CREATE_GPXS } from "./gql";

type FormValues = {
  file_: FileList;
};
export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  let readXml = null;
  const onSubmit = handleSubmit((data) => {
    // console.log("On Submit: ", data);
    const formData = new FormData();
    formData.append("file", data.file_[0]);
    const reader = new FileReader();
    reader.onload = function (e) {
      readXml = e.target.result as string;
      const parser = new DOMParser();
      const parsedGPX = parser.parseFromString(readXml, "application/xml");
      const gpxAsGeojson = JSON.stringify(converter.gpx(parsedGPX));
      createGpx({ variables: { content: gpxAsGeojson, title: "example" } });
    };
    reader.readAsText(data.file_[0]);
  });

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return "Files is required";
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return "Max file size 10mb";
      }
    }
    return true;
  };
  const { data, loading, error } = useQuery<{ gpxs: GpxModel[] }>(GET_GPXS);
  const [createGpx] = useMutation<{
    createGpx: GpxModel;
  }>(CREATE_GPXS);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <>
        <h3>Something went wrong!</h3>
        <div>{error.message}</div>
      </>
    );
  }

  return (
    <ChakraProvider>
      <div style={{ textAlign: "center", display: "relative" }}>
        {data?.gpxs[0]?.content && <Map gpx={data.gpxs[0].content} />}
        <div style={{ display: "absolute", height: "100vh", zIndex: 10 }}>
          <form onSubmit={onSubmit}>
            <FormControl isInvalid={!!errors.file_} isRequired>
              <FormLabel>{"File input"}</FormLabel>

              <FileUploader
                accept=".gpx"
                multiple
                register={register("file_", { validate: validateFiles })}
              >
                <Button leftIcon={<Icon as={FiFile} />}>Upload</Button>
              </FileUploader>

              <FormErrorMessage>
                {errors.file_ && errors?.file_.message}
              </FormErrorMessage>
            </FormControl>

            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </ChakraProvider>
  );
}
