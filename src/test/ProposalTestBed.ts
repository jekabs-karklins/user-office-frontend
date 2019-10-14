import { ProposalTemplate } from "../model/ProposalModel";

export const createTemplate = () => {
  return new ProposalTemplate({
    topics: [
      {
        topic_title: "General information",
        topic_id: 1,
        fields: [
          {
            proposal_question_id: "ttl_general",
            data_type: "EMBELLISHMENT",
            question: "",
            config: '{"html":"<h2>Indicators</h2>"}',
            value: null,
            dependencies: []
          },
          {
            proposal_question_id: "has_links_with_industry",
            data_type: "SELECTION_FROM_OPTIONS",
            question: "Links with industry?",
            config:
              '{"required":true, "options":["yes", "no"], "variant":"radio"}',
            value: '{"value":"no"}',
            dependencies: []
          },
          {
            proposal_question_id: "links_with_industry",
            data_type: "TEXT_INPUT",
            question: "If yes, please describe:",
            config: '{"placeholder":"Please specify links with industry"}',
            value: null,
            dependencies: [
              {
                proposal_question_dependency: "has_links_with_industry",
                condition: '{ "condition": "eq", "params":"yes"}',
                proposal_question_id: "links_with_industry"
              }
            ]
          },
          {
            proposal_question_id: "is_student_proposal",
            data_type: "SELECTION_FROM_OPTIONS",
            question: "Are any of the co-proposers students?",
            config:
              '{"required":true, "options":["yes", "no"], "variant":"radio"}',
            value: '{"value":"yes"}',
            dependencies: []
          },
          {
            proposal_question_id: "is_towards_degree",
            data_type: "SELECTION_FROM_OPTIONS",
            question: "Does the proposal work towards a students degree?",
            config:
              '{"required":true, "options":["yes", "no"], "variant":"radio"}',
            value: '{"value":"yes"}',
            dependencies: []
          },
          {
            proposal_question_id: "ttl_delivery_date",
            data_type: "EMBELLISHMENT",
            question: "",
            config: '{"html":"<h2>Final delivery date</h2>"}',
            value: null,
            dependencies: []
          },
          {
            proposal_question_id: "final_delivery_date",
            data_type: "DATE",
            question: "Choose a date",
            config: '{"min":"now", "required":true}',
            value: '{"value":"2019-09-26T08:57:00.000Z"}',
            dependencies: []
          },
          {
            proposal_question_id: "final_delivery_date_motivation",
            data_type: "TEXT_INPUT",
            question: "Please motivate the chosen date",
            config:
              '{"min":10, "multiline":true, "max":500, "small_label":"(e.g. based on awarded beamtime, or described intention to apply)"}',
            value: '{"value":""}',
            dependencies: []
          }
        ]
      }
    ]
  });
};

export const createFieldlessTemplate = () => {
  return new ProposalTemplate({
    topics: [
      {
        topic_title: "General information",
        topic_id: 0,
        fields: []
      }
    ]
  });
};
