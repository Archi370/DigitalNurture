using System;

namespace PlayersManagerLib
{
    public interface IPlayerMapper
    {
        bool IsPlayerNameExistsInDb(string name);
        void AddNewPlayerIntoDb(string name);
    }

    public class PlayerMapper : IPlayerMapper
    {
        public bool IsPlayerNameExistsInDb(string name) => false;
        public void AddNewPlayerIntoDb(string name) { }
    }
}