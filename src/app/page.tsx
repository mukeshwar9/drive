"use client";

import { useState } from "react";
import {
  ChevronRight,
  File,
  Folder,
  MoreVertical,
  Plus,
  Upload,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

// Mock data structure
const initialData = {
  root: {
    id: "root",
    name: "My Drive",
    type: "folder",
    children: ["folder1", "folder2", "file1", "file2"],
  },
  folder1: {
    id: "folder1",
    name: "Documents",
    type: "folder",
    children: ["folder3", "file3", "file4"],
  },
  folder2: {
    id: "folder2",
    name: "Photos",
    type: "folder",
    children: ["file5", "file6"],
  },
  folder3: {
    id: "folder3",
    name: "Work",
    type: "folder",
    children: ["file7"],
  },
  file1: {
    id: "file1",
    name: "Resume.pdf",
    type: "file",
    size: "2.4 MB",
    modified: "Apr 12, 2023",
  },
  file2: {
    id: "file2",
    name: "Budget.xlsx",
    type: "file",
    size: "1.8 MB",
    modified: "Mar 3, 2023",
  },
  file3: {
    id: "file3",
    name: "Project Proposal.docx",
    type: "file",
    size: "3.2 MB",
    modified: "Feb 15, 2023",
  },
  file4: {
    id: "file4",
    name: "Meeting Notes.txt",
    type: "file",
    size: "0.5 MB",
    modified: "Jan 28, 2023",
  },
  file5: {
    id: "file5",
    name: "Vacation.jpg",
    type: "file",
    size: "5.7 MB",
    modified: "Dec 12, 2022",
  },
  file6: {
    id: "file6",
    name: "Family.png",
    type: "file",
    size: "4.3 MB",
    modified: "Nov 5, 2022",
  },
  file7: {
    id: "file7",
    name: "Presentation.pptx",
    type: "file",
    size: "8.1 MB",
    modified: "Oct 22, 2022",
  },
};

export default function GoogleDriveUI() {
  const [currentFolder, setCurrentFolder] = useState("root");
  const [breadcrumbs, setBreadcrumbs] = useState([
    { id: "root", name: "My Drive" },
  ]);

  // Navigate to a folder
  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId);

    // Find the index of the folder in breadcrumbs if it exists
    const existingIndex = breadcrumbs.findIndex(
      (crumb) => crumb.id === folderId,
    );

    if (existingIndex !== -1) {
      // If folder exists in breadcrumbs, truncate the array to that point
      setBreadcrumbs(breadcrumbs.slice(0, existingIndex + 1));
    } else {
      // Otherwise add the new folder to breadcrumbs
      setBreadcrumbs([...breadcrumbs, { id: folderId, name: folderName }]);
    }
  };

  // Get current folder's children
  const getCurrentFolderContents = () => {
    const folder = initialData[
      currentFolder as keyof typeof initialData
    ] as any;
    if (!folder || !folder.children) return [];

    return folder.children.map((childId: any) => {
      const item = initialData[childId as keyof typeof initialData] as any;
      return item;
    });
  };

  // Mock file download/open
  const openFile = (fileId: string) => {
    const file = initialData[fileId as keyof typeof initialData] as any;
    alert(`Opening file: ${file.name}`);
    // In a real app, this would redirect to the file or download it
  };

  // Mock upload functionality
  const handleUpload = () => {
    alert("Upload functionality would open a file picker here");
  };

  const folderContents = getCurrentFolderContents();

  return (
    <div className="bg-background text-foreground dark min-h-screen">
      <div className="container mx-auto max-w-6xl p-4">
        {/* Header with breadcrumbs and upload button */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.id} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="text-muted-foreground mx-1 h-4 w-4" />
                )}
                <button
                  onClick={() => navigateToFolder(crumb.id, crumb.name)}
                  className="text-sm font-medium hover:underline"
                >
                  {crumb.name}
                </button>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleUpload} variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New
            </Button>
          </div>
        </div>

        {/* File list header */}
        <div className="border-border text-muted-foreground grid grid-cols-12 border-b py-2 text-sm font-medium">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Last Modified</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-1"></div>
        </div>

        {/* File and folder list */}
        <div className="divide-border divide-y">
          {folderContents.length > 0 ? (
            folderContents.map((item: any) => (
              <div
                key={item.id}
                className="hover:bg-muted/50 grid grid-cols-12 items-center rounded-md px-2 py-3"
              >
                <div className="col-span-6 flex items-center">
                  {item.type === "folder" ? (
                    <button
                      onClick={() => navigateToFolder(item.id, item.name)}
                      className="flex items-center"
                    >
                      <Folder className="mr-3 h-5 w-5 text-blue-500" />
                      <span>{item.name}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => openFile(item.id)}
                      className="flex items-center"
                    >
                      <File className="mr-3 h-5 w-5 text-gray-500" />
                      <span>{item.name}</span>
                    </button>
                  )}
                </div>
                <div className="text-muted-foreground col-span-3 text-sm">
                  {item.modified || "—"}
                </div>
                <div className="text-muted-foreground col-span-2 text-sm">
                  {item.size || "—"}
                </div>
                <div className="col-span-1 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Move</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          ) : (
            <div className="text-muted-foreground py-8 text-center">
              This folder is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
