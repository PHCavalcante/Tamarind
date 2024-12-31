type taskTypes = {
    _id?: string,
    title: string;
    description: string;
    scheduleDate?: Date;
    isCompleted?: boolean;
    userId?: string;
    createdAt?: string;
};

export default taskTypes;