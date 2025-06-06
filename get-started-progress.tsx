D:\YASHU\langflow-main\src\frontend\src\components\core\folderSidebarComponent\components\sideBarFolderButtons\components\get-started-progress.tsx

import IconComponent from "@/components/common/genericIconComponent";
import { Button } from "@/components/ui/button";
import ModalsComponent from "@/pages/MainPage/components/modalsComponent";
import useFlowsManagerStore from "@/stores/flowsManagerStore";
import { FC, useState } from "react";
import { cn } from "@/utils/utils";

export const GetStartedProgress: FC<{
  userData: any;
  isGithubStarred: boolean;
  isDiscordJoined: boolean;
  handleDismissDialog: () => void;
}> = ({ handleDismissDialog }) => {
  const [newProjectModal, setNewProjectModal] = useState(false);
  const flows = useFlowsManagerStore((state) => state.flows);
  const hasFlows = flows && flows.length > 0;

  return (
    <div className="mt-3 w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium" data-testid="get_started_progress_title">
          Get started
        </span>
        <button
          onClick={handleDismissDialog}
          className="text-muted-foreground hover:text-foreground"
          data-testid="close_get_started_dialog"
        >
          <IconComponent name="X" className="h-4 w-4" />
        </button>
      </div>

      {/* Only show create flow */}
      <div className="mt-2 space-y-1">
        <Button
          unstyled
          className={cn("w-full", hasFlows && "pointer-events-none")}
          onClick={() => setNewProjectModal(true)}
        >
          <div
            className={cn(
              "flex items-center gap-2 rounded-md p-2 py-[10px] hover:bg-muted",
              hasFlows && "pointer-events-none text-muted-foreground",
            )}
            data-testid="create_flow_btn_get_started"
          >
            <span data-testid="create_flow_icon_get_started">
              <IconComponent
                name={hasFlows ? "Check" : "Plus"}
                className={cn(
                  "h-4 w-4 text-primary",
                  hasFlows && "text-accent-emerald-foreground",
                )}
              />
            </span>
            <span className={cn("text-sm", hasFlows && "line-through")}>
              Create a flow
            </span>
          </div>
        </Button>
      </div>
      <ModalsComponent
        openModal={newProjectModal}
        setOpenModal={setNewProjectModal}
        openDeleteFolderModal={false}
        setOpenDeleteFolderModal={() => {}}
        handleDeleteFolder={() => {}}
      />
    </div>
  );
};

export default GetStartedProgress;
