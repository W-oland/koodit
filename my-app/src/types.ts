
export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

export interface NewInterface extends CoursePartBase {
    description: string;
}

export interface CourseNormalPart extends NewInterface {
    type: "normal";
}
export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

export interface CourseSubmissionPart extends NewInterface {
    type: "submission";
    exerciseSubmissionLink: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;