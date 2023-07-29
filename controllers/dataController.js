const { fetchData } = require('../models/data');

function sendDataAsJson(req, res) {
  const id = req.params.id;
  fetchData(id, (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const lotNames = [...new Set(data.map(item => item.code_lot))];
      const groupedData = data.reduce((acc, item) => {
        const { id_sous_offre: idSousOffre, code_lot: lotName, ...lotData } = item;
        if (!acc[idSousOffre]) {
          acc[idSousOffre] = {
            id_offre: item.id_offre,
            id_sous_offre: idSousOffre,
            participant: item.participant,
            lots: { [lotName]: lotData },
          };
        } else {
          acc[idSousOffre].lots[lotName] = lotData;
        }
        return acc;
      }, {});

      res.json({ data: Object.values(groupedData), lotNames });
    }
  });
}

module.exports = {
  sendDataAsJson,
};
