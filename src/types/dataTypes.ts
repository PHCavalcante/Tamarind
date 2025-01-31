export type taskTypes = {
    _id?: string;
    type?: string;
    title: string;
    description: string;
    scheduleDate?: string;
    isCompleted?: boolean;
    userId?: string;
    createdAt?: string;
    inProgress?: boolean;
};
export type noteTypes = Pick<
  taskTypes,
  "_id" | "title" | "description" | "userId" | "createdAt" | "type"
>;
export type listTypes = Pick<taskTypes, "_id" | "userId" | "title" | "createdAt" | "type"> & {
  tasksCounter: number;
  tasksStatus: boolean[];
  tasksTitles: string[];
};

export type combination = taskTypes &  listTypes;