// export type Ticket = {
//     requester_id: number,
//     assignee_id: number,
//     subject: string,
//     description: string
//     tags: string[]
// }

export type TicketResp = {
    count: number,
    next_page: any,
    previous_page: any,
    tickets: Ticket[]
}

export type Ticket = {
    allow_attachments: boolean,
    allow_channelback: boolean,
    assignee_id: number,
    brand_id: number,
    collaborator_ids: any[],
    created_at: string,
    custom_fields: any[],
    description: string,
    due_at: null,
    email_cc_ids: any[],
    external_id: null,
    fields: any[],
    follower_ids: any[],
    followup_ids: any[],
    forum_topic_id: null,
    group_id: number,
    has_incidents: boolean,
    id: number,
    is_public: boolean,
    organization_id: number,
    priority: null,
    problem_id: null,
    raw_subject: string,
    recipient: null,
    requester_id: number,
    satisfaction_rating: any,
    sharing_agreement_ids: any[],
    status: string,
    subject: string,
    submitter_id: number,
    tags: string[]
    ticket_form_id: number,
    type: null,
    updated_at: any,
    url: any,
    via: any
}