import HistoryService from "@/services/histories.service";

const service = new HistoryService();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const histories = await service.getHistories();
    res.status(200).json(histories);
  } else if (req.method === "PUT") {
    const newHistory = await service.createHistory(req.body);
    res.status(200).json(newHistory);
  }
}
