using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Caching.Memory;

namespace contactly.Models
{

    public static class Context
    {
        private const String contactCache = "contactCache";
        public static List<Contact> GetContactsFromMemory(IMemoryCache _cache)
        {
            //Get context from cache memory
            List<Contact> contacts = null;
            _cache.TryGetValue(contactCache, out contacts);
            return contacts ?? new List<Contact>();
        }
        public static IMemoryCache RemoveFromMemory(Contact contact, List<Contact> contacts, IMemoryCache _cache)
        {
            var existingContact = contacts.FirstOrDefault(X => X.Name == contact.Name);
            if (existingContact != null)
                contacts.Remove(existingContact);
            _cache.Set(contactCache, contacts);
            return _cache;
        }
        public static IMemoryCache AddToMemory(Contact contact, List<Contact> contacts, IMemoryCache _cache)
        {
            contacts.Add(contact);
            _cache.Set(contactCache, contacts);
            return _cache;
        }

    }
}