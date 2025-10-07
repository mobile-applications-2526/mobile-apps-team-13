namespace Mobile_back_end.Model.Entities;

public interface IDataBaseEntity<T>
{
    public bool Equals(T? other);
    
    public void Update(T? entity);
    
    public bool HardEquals(T? other);
    
    public bool CheckNullOrWrongType(object? other);
}