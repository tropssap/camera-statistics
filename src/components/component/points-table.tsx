import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "~/components/ui/dropdown-menu";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "~/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import Image from "next/image";
import { type JSX, type SVGProps } from "react";
import { createClient } from "~/server/supabase/supabase";

export async function PointsTable() {
  const supabase = createClient();
  await supabase.auth.getUser();
  const { data: points } = await supabase.from("points").select();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40  sm:px-7">
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {/* <Tabs defaultValue="all"> */}
          <div className="flex items-center">
            {/* <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger className="hidden sm:flex" value="archived">
                  Archived
                </TabsTrigger>
              </TabsList> */}
            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/dashboard/point/add"
                className="flex h-8 flex-row items-center justify-center gap-1 rounded-md bg-primary px-3 text-center text-primary-foreground hover:bg-primary/90"
              >
                <PlusCircleIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Point
                </span>
              </Link>
            </div>
          </div>
          {/* <TabsContent value="all"> */}
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Points</CardTitle>
              <CardDescription>
                Manage your points and view their performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Floor plan</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Number of cameras
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {points?.map((point) => (
                    <TableRow key={point.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Floor Plan"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={point.floor_plan_url ?? "/placeholder.svg"}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {point.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{point.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {point.camera_count}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {point.created_at}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              {/* <div className="text-xs text-muted-foreground">
                Showing
                <strong>1-10</strong> of <strong>32</strong>
                products
              </div> */}
            </CardFooter>
          </Card>
          {/* </TabsContent> */}
          {/* </Tabs> */}
        </main>
      </div>
    </div>
  );
}

function MoreHorizontalIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
function PlusCircleIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}
