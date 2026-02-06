import { formatDistanceToNow } from "date-fns";
import type { User } from "@/types/user";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import type { Selection } from "react-aria-components";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserTableProps {
  users: User[];
  selectedKeys: Set<number>;
  onSelectionChange: (keys: Set<number>) => void;
}

export function UserTable({
  users,
  selectedKeys,
  onSelectionChange,
}: UserTableProps) {
  const getStatusBtnVariant = (status: "active" | "unverified" | "blocked") => {
    if (status === "active") return "success";
    if (status === "blocked") return "danger";
    return "secondary";
  };
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table
        aria-label="Users"
        selectionMode="multiple"
        selectedKeys={selectedKeys as unknown as Selection}
        onSelectionChange={(keys) => {
          if (keys === "all") {
            onSelectionChange(new Set(users.map((u) => u.id)));
          } else {
            onSelectionChange(keys as Set<number>);
          }
        }}
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Last seen</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>

        <TableBody items={users}>
          {(user: User) => (
            <TableRow id={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Tooltip>
                  <TooltipTrigger>
                    {user.lastLogin
                      ? formatDistanceToNow(new Date(user.lastLogin), {
                          addSuffix: true,
                        })
                      : "Never"}
                  </TooltipTrigger>
                  <TooltipContent>
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleString("ru-RU", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })
                      : "Never"}
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Badge intent={getStatusBtnVariant(user.status)}>
                  {user.status}
                </Badge>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
