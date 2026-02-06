import { useState } from "react";
import { useUsers, useUserActions } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, Trash2, BrushCleaning, MailCheck } from "lucide-react";
import { UserTable } from "./components/UserTable";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";

export default function UserTablePage() {
  const { data: users, error } = useUsers();
  const { block, unblock, deleteUser, deleteUnverified, isPending } =
    useUserActions();
  const [selectedKeys, setSelectedKeys] = useState<Set<number>>(new Set());

  const hasSelection = selectedKeys.size > 0;
  const getSelectedIds = () => Array.from(selectedKeys);

  const handleAction = async (action: () => Promise<unknown>) => {
    await action();
    setSelectedKeys(new Set());
  };

  const verifyAccount = async () => {
    await api.post("auth/verify");
    await queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  if (error) return <div className="p-8 text-red-500">Error loading users</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-4 items-center p-2 rounded-lg border border-gray-200">
        <Tooltip>
          <Button
            onPress={() => handleAction(() => block(getSelectedIds()))}
            isDisabled={!hasSelection || isPending}
            intent="primary"
            size="md"
          >
            <Lock className="w-4 h-4 mr-2" />
            Block
          </Button>
          <TooltipContent>Block selected users</TooltipContent>
        </Tooltip>

        <Tooltip>
          <Button
            onPress={() => handleAction(() => unblock(getSelectedIds()))}
            isDisabled={!hasSelection || isPending}
            aria-label="Unblock selected"
            intent="primary"
            size="sq-md"
          >
            <Unlock className="w-4 h-4" />
          </Button>
          <TooltipContent>Unblock selected users</TooltipContent>
        </Tooltip>

        <Tooltip>
          <Button
            onPress={() => handleAction(() => deleteUser(getSelectedIds()))}
            isDisabled={!hasSelection || isPending}
            aria-label="Delete selected"
            intent="danger"
            size="sq-md"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <TooltipContent>Permanently delete selected users</TooltipContent>
        </Tooltip>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <Tooltip>
          <Button
            onPress={() => deleteUnverified()}
            isDisabled={isPending}
            aria-label="Delete unverified users"
            intent="danger"
            size="sq-md"
          >
            <BrushCleaning className="w-4 h-4" />
          </Button>
          <TooltipContent>Delete users who never logged in</TooltipContent>
        </Tooltip>

        <div className="ml-auto">
          <Tooltip>
            <Button
              onPress={() => verifyAccount()}
              isDisabled={isPending}
              intent="secondary"
              className="gap-2"
            >
              <MailCheck className="w-4 h-4" />
              Simulate Email Verify
            </Button>
            <TooltipContent>
              Click to verify your own account (Emulates clicking email link)
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <UserTable
        users={users || []}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      />

      <div className="mt-2 text-sm text-gray-500">
        {selectedKeys.size} users selected
      </div>
    </div>
  );
}
