type taskTypes = {
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

export default taskTypes;