package com.sinosteel.repository;

import com.sinosteel.domain.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactory;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.repository.core.RepositoryInformation;
import org.springframework.data.repository.core.RepositoryMetadata;
import org.springframework.data.repository.core.support.RepositoryFactorySupport;

import javax.persistence.EntityManager;
import java.io.Serializable;

public class BaseRepositoryFactoryBean<R extends JpaRepository<T, String>, T extends BaseEntity> extends JpaRepositoryFactoryBean<R, T, String>
{
	@Override
    protected RepositoryFactorySupport createRepositoryFactory(EntityManager em) 
	{
        return new BaseRepositoryFactory<T, String>(em);
    }

    private static class BaseRepositoryFactory<T extends BaseEntity, I extends Serializable> extends JpaRepositoryFactory
    {
        private final EntityManager em;

        public BaseRepositoryFactory(EntityManager em) 
        {
            super(em);
            this.em = em;
        }
        
        @SuppressWarnings("unchecked")
		@Override
        protected Object getTargetRepository(RepositoryInformation metadata) 
        {
            return new BaseRepositoryImpl<T>((Class<T>) metadata.getDomainType(), em);
        }

        @SuppressWarnings("unchecked")
		@Override
        protected SimpleJpaRepository<T, String> getTargetRepository(RepositoryInformation metadata, EntityManager em) 
        {
            return new BaseRepositoryImpl<T>((Class<T>) metadata.getDomainType(), em);
        }

        @Override
        protected Class<?> getRepositoryBaseClass(RepositoryMetadata metadata)
        {
            return BaseRepositoryImpl.class;
        }
    }
}
