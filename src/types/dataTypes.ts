export type taskTypes = {
    _id?: string,
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
  "_id" | "title" | "description" | "userId" | "createdAt"
>;
export type listTypes = Pick<taskTypes, "_id" | "userId" | "title" | "createdAt"> & {
  tasksCounter: number;
  tasksStatus: boolean[];
};