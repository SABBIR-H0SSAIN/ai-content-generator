"use client";
import { generateContentAction } from "@/actions";
import CopyButton from "@/components/CopyButton";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { useCreaditBalance } from "@/providers/CreaditBalanceProvider";
import { useActionState, useEffect } from "react";
import ContentGenerationFormCard from "./ContentGenerationFormCard";

type State = {
  success: boolean;
  data: {
    response: string | null;
    remainingBalance: number | null;
  };
  error: string | null;
};

const ManageContentForm = ({
  template,
  templateId,
}: {
  template: {
    id: string;
    title: string;
    description: string;
    icon: string;
    forms: any;
  };
  templateId: string;
}) => {
  const { refreshBalanceInBackground, updateBalance, balance } =
    useCreaditBalance();
  const actionState = useActionState(
    generateContentAction as any,
    {
      success: false,
      data: { response: null, remainingBalance: null },
      error: null,
    } as State
  );

  const [state, , loading] = actionState;

  useEffect(() => {
    if (state.success) {
      updateBalance(state.data.remainingBalance as number);
      refreshBalanceInBackground();
    }
  }, [state, updateBalance, refreshBalanceInBackground]);

  return (
    <>
      <ContentGenerationFormCard
        template={template}
        templateId={templateId}
        actionState={actionState}
        balance={balance as number}
        updateBalance={updateBalance}
      />
      <div
        id="ai-response"
        className="flex-1 w-full sm:min-w-[400px]  max-xl:max-w-[500px] xl:h-full  overflow-y-scroll hide-scrollbar  shadow-lg mx-auto"
      >
        <div className="flex flex-col gap-4 w-full mx-auto shadow-lg rounded-lg py-4 px-6 bg-card ">
          <div className="flex justify-between border-b-2 pb-4">
            <h1 className="text-2xl">Ai Response</h1>

            <CopyButton
              disabled={loading || !state?.data?.response}
              content={state?.data?.response as string}
            />
          </div>
          <div className="">
            {loading && (
              <code>
                <TextShimmerWave className={`text-foreground`} duration={1}>
                  Ai is Thinking...
                </TextShimmerWave>
              </code>
            )}
            {state?.error && !loading && (
              <span className="text-lg text-red-500">{state?.error}</span>
            )}
            <MarkdownRenderer
              content={loading ? "" : state?.data?.response || ""}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageContentForm;
