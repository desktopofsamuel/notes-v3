import { table } from "../../lib/airtable/airtable";

export default async (_req, res) => {
  try {
    const records = await table
      .select({
        fields: [
          "Name",
          "NameTC",
          "DescriptionTC",
          "Category",
          "CreateTime",
          "ExtraLink",
          "CTATC",
          "Image",
        ],
        filterByFormula:
          "AND({Status} = 'Published', NOT({Category} = 'Hardware'))",
        sort: [{ field: "Name", direction: "asc" }],
      })
      .firstPage();

    // const items = records.push((item) => ({
    //   name: fields["NameTC"],
    // }))

    // const apps = items.map((item) => ({
    //   name: fields["NameTC"],
    // }));

    // console.log(items)

    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};
