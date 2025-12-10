const dynamicInputToInsert = (
  payload: Record<string, unknown>,
  validInput: string[]
) => {
  const fields: string[] = [];
  const indexes: string[] = [];
  const params: unknown[] = [];
  let paramIndex = 1;

  for (const input of validInput) {
    if (payload[input] !== undefined) {
      fields.push(input);
      indexes.push(`$${paramIndex}`);
      params.push(payload[input]);
      paramIndex++;
    }
  }

  const fieldNames = fields.join(", ");
  const IndexesWith$ = indexes.join(", ");

  return { fieldNames, indexes: IndexesWith$, params };
};

export default dynamicInputToInsert;
