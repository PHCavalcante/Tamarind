type taskTypes = {
    _id?: string,
    type?: string;
    title: string;
    description: string;
    scheduleDate?: string;
    isCompleted?: boolean;
    userId?: string;
    createdAt?: string;
};

export default taskTypes;