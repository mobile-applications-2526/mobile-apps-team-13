using ClosedXML.Excel;
using OmDeHoek.Utils;
using OmDeHoek.Model.Entities;

namespace OmDeHoek.Model.Data;

public static class ExcelFileReader
{
    private static Tuple<List<string>, List<IXLRangeRow>, XLWorkbook> ReadFile(string filePath)
    {
        ConsoleUtils.LogInfo($"Trying to read seed data from file: {filePath}");
        
        var workbook = new XLWorkbook(filePath);
        var worksheet = workbook.Worksheets.First();
        var rows = worksheet.RangeUsed()?.RowsUsed()?.ToList();
            
        if (rows == null || rows.Count < 2)
        {
            ConsoleUtils.LogWarning($"No data found in Excel file at {filePath}");
            workbook.Dispose();
            return new Tuple<List<string>, List<IXLRangeRow>, XLWorkbook>(new List<string>(), new List<IXLRangeRow>(), workbook);
        }
            
        var headers = rows
            .First()
            .Cells()
            .Select(cell => cell
                .GetString()
                .Trim())
            .ToList();
        
        ConsoleUtils.LogInfo($"successfully read seed data from {filePath}");

        return new Tuple<List<string>, List<IXLRangeRow>, XLWorkbook>(headers, rows.ToList(), workbook);
    }
    
    public static List<Gemeente> ReadExcelGemeenten(string filePath)
    {
        var data = new List<Gemeente>();

        var (headers, rows, workbook) = ReadFile(filePath);

        foreach (var row in rows.Skip(1))
        {
            if(row.Cells().Any(c => string.IsNullOrWhiteSpace(c.GetString())))
            {
                continue;
            }

            var gemeente = new Gemeente();
            
            foreach (var cell in row.Cells())
            {
                var header = headers[cell.Address.ColumnNumber - 1].Trim();
                var cellValue = cell.GetString().Trim();

                switch (header)
                {
                    case "Code NIS":
                        gemeente.NisCode = cellValue;
                        break;
                    case "Entités administratives":
                        gemeente.NaamFr = cellValue;
                        break;
                    case "Administratieve eenheden":
                        gemeente.NaamNl = cellValue;
                        break;
                    case "Taal":
                        gemeente.GesprokenTalen = cellValue;
                        break;
                    default:
                        break;
                }
                
            }
            data.Add(gemeente);
        }
        workbook.Dispose();
        return data;
    }

    public static List<DeelGemeente> ReadExcelDeelGemeenten(string filePath)
    {
        var data = new List<DeelGemeente>();
        
        var (headers, rows, workbook) = ReadFile(filePath);
        
        foreach (var row in rows.Skip(1))
        {
            var deelGemeente = new DeelGemeente();
            
            foreach (var cell in row.Cells())
            {
                var header = headers[cell.Address.ColumnNumber - 1].Trim();
                var cellValue = cell.GetString().Trim();

                switch (header)
                {
                    case "CD_MUN":
                        deelGemeente.NisCodeGemeente = cellValue;
                        break;
                    case "NomdeNIS6":
                        deelGemeente.NaamFr = cellValue;
                        break;
                    case "NIS6naam":
                        deelGemeente.NaamNl = cellValue;
                        break;
                    case "NIS6_code_INS6":
                        deelGemeente.Nis6Code = cellValue;
                        break;
                    default:
                        break;
                }
                
            }
            data.Add(deelGemeente);
        }
        workbook.Dispose();
        return data;
    }

    public static List<Buurt> ReadExcelBuurten(string filePath, List<Gemeente> gemeentes)
    {
        var data = new List<Buurt>();
        var hashSet = new HashSet<Gemeente>();
        
        var (headers, rows, workbook) = ReadFile(filePath);
        
        foreach (var row in rows.Skip(1))
        {
            if (row.Cells().Any(c => string.IsNullOrWhiteSpace(c.GetString())))
            {
                continue;
            }
            var buurt = new Buurt();
            
            string duitseNaamGemeente = string.Empty;
            string nisGemeente = string.Empty;
            
            foreach (var cell in row.Cells())
            {
                var header = headers[cell.Address.ColumnNumber - 1].Trim();
                var cellValue = cell.GetString().Trim();
                
                switch (header)
                {
                    case "C_NIS5":
                        nisGemeente = cellValue;
                        break;
                    case "C_NIS6":
                        buurt.Nis6DeelGemeente = cellValue;
                        break;
                    case "Nomsecteur":
                        buurt.NaamFr = cellValue;
                        break;
                    case "Benamingsector":
                        buurt.NaamNl = cellValue;
                        break;
                    case "Bezeichnung des statistischen Sektors":
                        buurt.NaamDe = cellValue;
                        break;
                    case "Name der Gemeinde":
                        duitseNaamGemeente = cellValue;
                        break;
                    case "StatistischeSector_code_Secteurstatistique":
                        buurt.StatistischeSectorCode = cellValue;
                        break;
                    default:
                        break;
                }
                
            }
            var gemeente = gemeentes.FirstOrDefault(g => g.NisCode == nisGemeente);
            if (gemeente != null && !hashSet.Contains(gemeente))
            {
                gemeente.NaamDe = duitseNaamGemeente;
                hashSet.Add(gemeente);
            }
            data.Add(buurt);
        }
        
        workbook.Dispose();
        return data;
    }

    public static List<Postcode> ReadExcelPostcodes(string filePath)
    {
        var data = new List<Postcode>();

        var (headers, rows, workbook) = ReadFile(filePath);
        
        foreach (var row in rows.Skip(1))
        {
            if(row.Cells().Any(c => string.IsNullOrWhiteSpace(c.GetString())))
            {
                continue;
            }

            var postcode = new Postcode();
            
            foreach (var cell in row.Cells())
            {
                var header = headers[cell.Address.ColumnNumber - 1].Trim();
                var cellValue = cell.GetString().Trim();

                switch (header)
                {
                    case "Postal code":
                        postcode.Code = cellValue;
                        break;
                    case "Refnis code":
                        postcode.NisCodeGemeente = cellValue;
                        break;
                    default:
                        break;
                }
                
            }
            data.Add(postcode);
        }
        workbook.Dispose();
        return data;
    }
}