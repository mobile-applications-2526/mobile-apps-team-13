using OmDeHoek.Model;
using OmDeHoek.Model.DTO;
using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;
using OmDeHoek.Model.Exceptions;

namespace OmDeHoek.Services;

public class GemeenteService(UnitOfWork uow)
{
    public async Task<List<GemeenteDto>> GetAllAsync(Talen taal = Talen.En)
    {
        return (await uow.GemeenteRepository.GetAllAsync()).Select(g => new GemeenteDto(g, taal)).ToList();
    }
    
    public async Task<GemeenteDto> GetByNisCodeAsync(string nisCode, Talen taal = Talen.En)
    {
        if (string.IsNullOrWhiteSpace(nisCode))
        {
            throw new InvalidInputException("NIS-code mag niet leeg zijn.", "NISCode");
        }
        
        var gemeente = await uow.GemeenteRepository.GetByNisCodeAsync(nisCode);
        if (gemeente == null)
        {
            throw new ResourceNotFoundException($"Gemeente met NIS-code {nisCode} niet gevonden.", "NISCode");
        }
        
        return new GemeenteDto(gemeente, taal);
    }
    
    public async Task<GemeenteDto> GetByNaamAsync(string naam, Talen taal = Talen.En)
    {
        if (string.IsNullOrWhiteSpace(naam))
        {
            throw new InvalidInputException("Naam mag niet leeg zijn.", "Naam");
        }
        
        var gemeente = await uow.GemeenteRepository.GetByNaamAsync(naam);
        if (gemeente == null)
        {
            throw new ResourceNotFoundException($"Gemeente met naam {naam} niet gevonden.", "Naam");
        }
        
        return new GemeenteDto(gemeente, taal);
    }
    
    public async Task<List<GemeenteDto>> SearchByPostCodeAsync(string postCode, Talen taal = Talen.En)
    {
        if (string.IsNullOrWhiteSpace(postCode))
        {
            throw new InvalidInputException("Postcode mag niet leeg zijn.", "PostCode");
        }
        
        var gemeenten = await uow.GemeenteRepository.SearchByPostCodeAsync(postCode);
        if (!gemeenten.Any())
        {
            throw new ResourceNotFoundException($"Geen gemeenten gevonden voor postcode {postCode}.", "PostCode");
        }
        
        return gemeenten.Select(g => new GemeenteDto(g, taal)).ToList();
    }
}