import {TicketResp, Ticket} from './data.interface';

export let ticketsMock: Ticket[] = [
    {
        allow_attachments: true,
        allow_channelback: false,
        assignee_id: 1267064716749,
        brand_id: 1260803211569,
        collaborator_ids: [],
        created_at: '2021-11-22T21:11:03Z',
        custom_fields: [],
        description: 'This is very long description of ticket 1',
        due_at: null,
        email_cc_ids: [],
        external_id: null,
        fields: [],
        follower_ids: [],
        followup_ids: [],
        forum_topic_id: null,
        group_id: 1260815637909,
        has_incidents: false,
        id: 10,
        is_public: true,
        organization_id: 1260918229249,
        priority: null,
        problem_id: null,
        raw_subject: 'This is raw subject of ticket 1',
        recipient: null,
        requester_id: 1267064716749,
        satisfaction_rating: null,
        sharing_agreement_ids: [],
        status: 'open',
        subject: 'This is subject of ticket 1',
        submitter_id: 1267064716749,
        tags: [
            'down',
            'internet',
            'connectivity'
        ],
        ticket_form_id: 1260814908569,
        type: null,
        updated_at: '2021-10-22T21:11:03Z',
        url: 'https://zccufl.zendesk.com/api/v2/tickets/22.json',
        via: {
            channel: 'api',
            source: {
            from: {},
            rel: null,
            to: {}
            }
        }
    },

    {
        allow_attachments: true,
        allow_channelback: false,
        assignee_id: 1267064716749,
        brand_id: 1260803211569,
        collaborator_ids: [],
        created_at: '2021-11-22T21:11:03Z',
        custom_fields: [],
        description: 'This is very long description of ticket 2',
        due_at: null,
        email_cc_ids: [],
        external_id: null,
        fields: [],
        follower_ids: [],
        followup_ids: [],
        forum_topic_id: null,
        group_id: 1260815637909,
        has_incidents: false,
        id: 10,
        is_public: true,
        organization_id: 1260918229249,
        priority: null,
        problem_id: null,
        raw_subject: 'This is raw subject of ticket 2',
        recipient: null,
        requester_id: 1267064716749,
        satisfaction_rating: null,
        sharing_agreement_ids: [],
        status: 'open',
        subject: 'This is subject of ticket 2',
        submitter_id: 1267064716749,
        tags: [
            'Power',
            'Inconvenience',
            'vacating'
        ],
        ticket_form_id: 1260814908569,
        type: null,
        updated_at: '2021-10-22T21:11:03Z',
        url: 'https://zccufl.zendesk.com/api/v2/tickets/22.json',
        via: {
            channel: 'api',
            source: {
            from: {},
            rel: null,
            to: {}
            }
        }
    },
];

export let ticketsRespMock: TicketResp = {
    count: 2,
    next_page: null,
    previous_page: null,
    tickets: ticketsMock
};
