using OmDeHoek.Model;
using OmDeHoek.Model.DTO;
using OmDeHoek.Model.Enums;

namespace OmDeHoek.Services;

public class PostcodeService(UnitOfWork uow)
{
    public async Task<List<PostcodeDto>> GetAllPostcodesAsync(Talen taal = Talen.En)
    {
        var postcodes = await uow.PostcodeRepository.GetAllAsync();
        var list = postcodes
            .Select(p => new PostcodeDto(p, taal))
            .ToList();

        list.Sort((a, b) => string.Compare(a.Code, b.Code, StringComparison.Ordinal));
        return list;
    }
}