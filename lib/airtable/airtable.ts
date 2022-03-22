import Airtable from "airtable";

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

// Initialize a base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID as string);

// Reference a table
const table = base(process.env.AIRTABLE_TABLE_NAME as string);

// To get minified records array
const minifyItems = (records: any) =>
  records.map((record: any) => getMinifiedItem(record));

// to make record meaningful.
const getMinifiedItem = (record: any) => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

export { table, minifyItems, getMinifiedItem };
