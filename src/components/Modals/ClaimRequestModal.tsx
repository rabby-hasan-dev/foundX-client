import { FieldValues, SubmitHandler } from "react-hook-form";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import FXModal from "./FXModal";
import FXTextarea from "../form/FXTextarea";
import { Button } from "@nextui-org/button";
import { useAddClaimRequest } from "@/src/hooks/claimRequestHooks";

interface ClaimRequestModelProps {
    id: string;
    quessions: string[];
}

const ClaimRequestModal = ({ id, quessions }: ClaimRequestModelProps) => {
    const { mutate: handleClaimRequest, isPending ,isError} = useAddClaimRequest();
  
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const claimRequestData = {
            item: id,
            description: data.description,
            answers: Object.keys(data).filter((formElement) => formElement.startsWith('answer')).map((answer) => data[answer])
        }

        handleClaimRequest(claimRequestData);
    }
    return (
        <FXModal buttonText="Claim Request" title="Claim Request">
            <FXForm onSubmit={onSubmit}>
                {
                    quessions.map((quession, index) => (
                        <div className="mb-4" key={index} >
                            <p className="mb-2">{quession} </p>
                            <FXInput name={`answer - ${index + 1}`} label={`Answer - ${index + 1}`}></FXInput>
                        </div>
                    ))
                }
                <FXTextarea name="description" label="Descriptions"></FXTextarea>
                <div>
                    <Button className="flex-1 mt-2 w-full" type="submit">

                        {isPending ? "Sending.." : ' Send'}
                    </Button>
                </div>
            </FXForm>

        </FXModal>
    );
};

export default ClaimRequestModal;