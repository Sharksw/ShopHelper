import ExcelBuilder from "excel-builder-webpack";

import { formatDate } from "./dateService";

export default dataForExcel => {
  const workbook = ExcelBuilder.Builder.createWorkbook();
  const worksheet = workbook.createWorksheet({ name: "Report" });

  // const originalData = [
  //   [
  //     "Date",
  //     "Shop",
  //     "Photo",
  //     "Bar code",
  //     "Name",
  //     "Quantity",
  //     "Price",
  //     "Amount",
  //     "Currency"
  //   ]
  // ];
  const originalData = [
    [
      "Дата",
      "Метка на список",
      "Штрих код",
      "Bar code",
      "Название",
      "Количество",
      "Цена",
      "Итого",
      "Валюта"
    ]
  ];
  dataForExcel.forEach(
    (
      {
        id,
        name,
        price,
        quantity,
        photo,
        barCode,
        date,
        currency,
        shopName,
        amount
      },
      index
    ) => {
      originalData.push([
        formatDate(date),
        shopName,
        photo ? "" : "Фото отсутсвует",
        barCode,
        name,
        quantity,
        price,
        amount,
        currency
      ]);
      if (photo) {
        const drawings = new ExcelBuilder.Drawings();

        // var picRef = workbook.addMedia("image", "logo.png", imageString);
        const picRef = workbook.addMedia("image", `${id}.jpg`, photo);
        const picture = new ExcelBuilder.Drawing.Picture();
        picture.createAnchor("twoCellAnchor", {
          from: {
            x: 2,
            y: index + 1
          },
          to: {
            x: 3,
            y: index + 2
          }
        });
        picture.setMedia(picRef);
        drawings.addDrawing(picture);
        worksheet.setRowInstructions(index + 1, { height: 100 });

        worksheet.addDrawings(drawings);
        workbook.addDrawings(drawings);
      }
    }
  );

  const columns = [
    { id: "date", name: "Date", type: "date", width: 30 },
    { id: "shopName", name: "shopName", type: "string", width: 20 },
    { id: "photo", name: "photo", type: "string", width: 25 },
    { id: "barCode", name: "barCode", type: "number" },
    { id: "name", name: "name", type: "string" },
    { id: "quantity", name: "quantity", type: "number" },
    { id: "price", name: "price", type: "number" },
    { id: "amount", name: "amount", type: "number" },
    { id: "currency", name: "currency", type: "string" }
  ];

  worksheet.setData(originalData);
  worksheet.setColumns(columns);

  workbook.addWorksheet(worksheet);

  return ExcelBuilder.Builder.createFile(workbook).then(data => atob(data)); // eslint-disable-line
};
