# Amazon Connect Flow Parser

This package is used to parse an Amazon Connect contact flow and use it for the following purposes:

- Create all of the paths a contact can take in the contact flow
  - Dependency Graph to show which blocks/nodes are required for routing a contact
  - Can be used for testing the contact flow (Call, Chat, Task)
- An Intermediate representation of the contact flow
  - Can be used for comparing two contact flows
  - Can be used for generating test cases for the contact flow
  - Can be used for testing the contact flow (Call, Chat, Task)
  - Can be used for generating a flow chart of the contact flow

The output of this package is an IR (Intermediate Representation) of the contact flow.

## IR (Intermediate Representation)

The IR is a representation of the contact flow that is used to create the path.

It is a tree structure that represents the contact flow.
