import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  ChakraProvider,
  VStack,
  Box,
  Flex,
  Text,
  Spacer,
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

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("file", data.file_[0]);
    const reader = new FileReader();
    reader.onload = function (e) {
      const readXml = e.target.result as string;
      const parser = new DOMParser();
      const parsedGPX = parser.parseFromString(readXml, "application/xml");
      const gpxAsGeojson = JSON.stringify(converter.gpx(parsedGPX));
      createGpx({ variables: { content: gpxAsGeojson, title: "example" } });
    };
    reader.readAsText(data.file_[0]);
  });

  const { data, loading, error } = useQuery<{ gpxs: GpxModel[] }>(GET_GPXS);
  const [createGpx] = useMutation<{
    createGpx: GpxModel;
  }>(CREATE_GPXS, { refetchQueries: [{ query: GET_GPXS }] });
  const [loadedGpxId, setLoadedGpxId] = useState(data?.gpxs[0]?.id);
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
        {loadedGpxId && <Map id={loadedGpxId} />}
        <Box style={{ height: "100vh" }}>
          <VStack w={350} p={4} spacing={4} align="stretch">
            <form onSubmit={onSubmit}>
              <Flex>
                <FormControl isInvalid={!!errors.file_} isRequired>
                  <Box>
                    <FormLabel>{"File input"}</FormLabel>
                  </Box>
                  <Box>
                    <FileUploader
                      accept=".gpx"
                      multiple
                      register={register("file_", { validate: validateFiles })}
                    >
                      <Button leftIcon={<Icon as={FiFile} />}>Upload</Button>
                    </FileUploader>
                  </Box>
                  <FormErrorMessage>
                    {errors.file_ && errors?.file_.message}
                  </FormErrorMessage>
                </FormControl>
                <Box alignSelf="flex-end">
                  <Button type="submit" colorScheme="yellow">
                    Submit
                  </Button>
                </Box>
              </Flex>
            </form>

            <VStack>
              {data.gpxs.map(({ title, id }) => {
                return (
                  <Flex key={id} width="100%" align="center" justify="center">
                    <Text
                      fontWeight={600}
                      style={{ textTransform: "capitalize", zIndex: 2 }}
                    >
                      {title}
                    </Text>
                    <Spacer />
                    <Button onClick={() => setLoadedGpxId(id)}>Load</Button>
                  </Flex>
                );
              })}
            </VStack>
          </VStack>
        </Box>
      </div>
    </ChakraProvider>
  );
}
