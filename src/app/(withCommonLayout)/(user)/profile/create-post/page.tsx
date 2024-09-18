'use client'

import FXInput from '@/src/components/form/FXInput';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import React from 'react';
import { FieldValues, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

const page = () => {
    const methods = useForm();
    const { control, handleSubmit } = methods;
    const { append, remove, fields } = useFieldArray({
        control,
        name: "quessions"
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const postData = {
            ...data,
            quessions: data?.quessions.map((que: { value: string }) => que.value)
        }
        console.log(postData);
    }

    const handleFieldAppend = () => {
        append({ name: 'quessions' })
    }

    return (
        <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)} >

                <FXInput name='title' label='Title' type='text' size='md'></FXInput>
                <Divider className='my-5'></Divider>

                <div className='flex justify-between items-center'>
                    <h1 className='text-xl'>Owner verificaton Quessions</h1>
                    <Button onClick={() => handleFieldAppend()} >Append</Button>
                </div>
                {
                    fields.map((field, index) => (
                        <div key={field.id} className='flex justify-between items-center'>
                            <FXInput name={`quessions.${index}.value`} type='text' label='Quessions'></FXInput>
                            <Button onClick={() => remove(index)} >Remove</Button>
                        </div>
                    )

                    )
                }
                <Divider className='my-5'></Divider>
                <Button type='submit'>Post</Button>

            </form>
        </FormProvider>
    );
};

export default page;