"use client";

import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import FXInput from "@/src/components/form/FXInput";
import FXTextarea from "@/src/components/form/FXTextarea";
import { AddIcon, TrashIcon } from "@/src/assets/Icons";
import FXDatePicker from "@/src/components/form/FXDatePicker";
import dateToISO from "@/src/utils/dateToIso";
import FXSelect from "@/src/components/form/FXSelect";
import { allDistict } from '@bangladeshi/bangladesh-address'
import { useGetCategories } from "@/src/hooks/categoriesHooks";
import { ChangeEvent, useState } from "react";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/postHooks";
import { useRouter } from "next/navigation";
import Loading from "@/src/components/UI/Loading";

const cityOptions = allDistict()
  .sort()
  .map((city: string) => {
    return {
      key: city,
      label: city,
    };
  });




export default function CreatePost() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([])
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([])
  const {user}=useUser();
  const router=useRouter();

  const { data: categoriesData, isLoading: categoryLaoding, isSuccess: categorySuccess } = useGetCategories();

  let categoryOptions: { key: string, label: string }[] = [];
  if (categoriesData?.data && !categoryLaoding) {
    categoryOptions = categoriesData?.data?.map((category: { _id: string; name: string }) => ({
      key: category._id,
      label: category.name
    }))
  }

  const methods = useForm();
  const { control, handleSubmit } = methods;
  const {mutate:handleCreatePost, isPending:createPostPending,isSuccess}=useCreatePost();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    const formData=new FormData();

    const postData = {
      ...data,
      questions: data.questions.map((que: { value: string }) => que.value),
      dateFound: dateToISO(data?.dateFound),
      user:user?._id,
    
      

    };

    formData.append('data',JSON.stringify(postData));

    for(let image of imageFiles){
      formData.append('itemImages',image)
    }

    handleCreatePost(formData);
      
  };

  const handleFieldAppend = () => {
    append({ name: "questions" });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files![0];
    setImageFiles((prev) => [...prev, files])

    if (files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string])
      }

      reader.readAsDataURL(files);
    }


  }

  if (!createPostPending && isSuccess) {
    router.push("/");
  }


  return (
    <>
   {createPostPending && <Loading />}
      <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
        <h1 className="text-2xl font-semibold">Post a found item</h1>
        <Divider className="mb-5 mt-3" />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXInput label="Title" name="title" />
              </div>
              <div className="min-w-fit flex-1">
                <FXDatePicker label="Found Date" name="dateFound"></FXDatePicker>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXInput label="Location" name="location" />
              </div>
              <div className="min-w-fit flex-1">
                <FXSelect name="city" label="City" options={cityOptions}></FXSelect>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXSelect name="category" label="Category" disabled={!categorySuccess} options={categoryOptions}></FXSelect>
              </div>
              <div className="min-w-fit flex-1">
                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                  htmlFor="image"
                >
                  Upload image
                </label>
                <input
                  multiple
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>
            <div>
              <div className="flex gap-5 my-5 flex-wrap ">
                {
                  imagePreviews?.length > 0 && imagePreviews.map((url) => (
                  <div key={url} className="size-48 rounded-xl border-2 border-dashed border-default-300 p-2">
                    <img className="h-full w-full object-cover object-center rounded-md" src={url} />
                  </div>))
                }
              </div>
            </div>

            <div className="flex flex-wrap-reverse gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXTextarea label="Description" name="description" />
              </div>
            </div>

            <Divider className="my-5" />

            <div className="flex justify-between items-center mb-5">
              <h1 className="text-xl">Owner verification questions</h1>
              <Button isIconOnly onClick={() => handleFieldAppend()}>
                <AddIcon />
              </Button>
            </div>

            <div className="space-y-5">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <FXInput label="Question" name={`questions.${index}.value`} />
                  <Button
                    isIconOnly
                    className="h-14 w-16"
                    onClick={() => remove(index)}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              ))}
            </div>

            <Divider className="my-5" />
            <div className="flex justify-end">
              <Button size="lg" type="submit">
                Post
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}