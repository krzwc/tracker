import React from "react";
import { useQuery } from "@apollo/client";
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

import type { GpxModel } from "../../lambda/models/gpx";

import { Map } from "../Map";
import { FileUploader } from "../FileUploader";
import { GET_GPXS } from "./queries";

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
      readXml = e.target.result;
      // console.log(readXml);
      const parser = new DOMParser();
      const doc = parser.parseFromString(readXml as string, "application/xml");
      console.log(doc);
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
      <div style={{ textAlign: "center" }}>
        {/* <ul>
        {data?.gpxs.map(({ content, title }, index: number) => (
          <li key={index}>
            <h3>{title}</h3>
            <pre>{builder.buildObject(JSON.parse(content))}</pre>
          </li>
        ))}
      </ul> */}
        {/* {data && <Map gpx={data.gpxs[0].content} />} */}
        <form onSubmit={onSubmit} encType="multipart/form-data">
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

          <button>Submit</button>
        </form>
      </div>
    </ChakraProvider>
  );
}
