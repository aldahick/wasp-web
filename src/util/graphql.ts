import { MutationFunction } from "react-apollo";

export async function callMutationSafe<D, V>(mutation: MutationFunction<D, V>, variables: V): Promise<D> {
  const res = await mutation({ variables });
  if (!res) {
    throw new Error("no response");
  } else if (res.errors) {
    console.error(res.errors);
    throw new Error("Server-side error occurred:\n" + res.errors.map(e => e.message).join("\n"));
  } else if (!res.data) {
    throw new Error("no data");
  }
  return res.data;
}
