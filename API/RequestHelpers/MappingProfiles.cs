using API.DTOs;
using API.Entities;
using API.Services;
using AutoMapper;

namespace API.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<PhotosessionDto, Photosession>();
            // CreateMap<UpdateClientDto, Client>();
            // CreateMap<ContactDto, Contact>();
            // CreateMap<UpdateContactDto, Contact>();
            // CreateMap<InvoiceDto, Invoice>();
            // CreateMap<BankDto, Bank>();
            // CreateMap<BankAccountDto, BankAccount>();
            // CreateMap<ExchangeRatesDto, ExchangeRate>();
            // CreateMap<VatRateDto, VatRate>();
        }
    }
}