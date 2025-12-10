const dynamicInputToUpdate = (
  payload: Record<string, unknown>,
  validInput: string[],
  id: string
) => {
  const updates: string[] = [];
  const params: unknown[] = [];
  let paramIndex = 1;

  for (const input of validInput) {
    if (payload[input] !== undefined) {
      updates.push(`${input}=$${paramIndex}`);
      params.push(payload[input]);
      paramIndex++;
    }
  }

  if (updates.length === 0) {
    return { setClause: "", params: [] };
  }

  updates.push(`updated_at=NOW()`);

  const setClause = updates.join(", ");

  params.push(id);

  return { setClause, params, idPlaceholderIndex: paramIndex };
};

export default dynamicInputToUpdate;
