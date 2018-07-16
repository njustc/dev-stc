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

/**
 * <br>使BaseRepositoryFactoryBean代替默认的RepositoryFactoryBean</br>
 * <br>返回一个自定义的RepositoryFactory</br>
 * 用来给{@code BaseRepository}添加自定义接口
 * @param <R> 继承自{@code JpaRepository}的仓库接口类型
 * @param <T> 继承自{@code BaseEntity}的实体类型
 */
public class BaseRepositoryFactoryBean<R extends JpaRepository<T, String>, T extends BaseEntity> extends JpaRepositoryFactoryBean<R, T, String>
{
    /**
     * 返回一个自定义的RepositoryFactory
     * @param em 实体类管理器EntityManager
     * @return 自定义的RepositoryFactory
     */
	@Override
    protected RepositoryFactorySupport createRepositoryFactory(EntityManager em) 
	{
        return new BaseRepositoryFactory<T, String>(em);
    }

    /**
     * <br>自定义的 RepositoryFactory类</br>
     * 用来给BaseRepository添加自定义接口
     * @param <T> BaseEntity的子类
     * @param <I> Serializable的子类
     */
    private static class BaseRepositoryFactory<T extends BaseEntity, I extends Serializable> extends JpaRepositoryFactory
    {
        private final EntityManager em;

        /**
         * 自定义构造函数
         * @param em 实体类管理器EntityManager
         */
        public BaseRepositoryFactory(EntityManager em) 
        {
            super(em);
            this.em = em;
        }

        /**
         * 重载{@code getTargetRepository}类
         * @param metadata RepositoryInformation仓库类接口信息
         * @return 返回BaseRepositoryImpl
         */
        @SuppressWarnings("unchecked")
		@Override
        protected Object getTargetRepository(RepositoryInformation metadata) 
        {
            return new BaseRepositoryImpl<T>((Class<T>) metadata.getDomainType(), em);
        }

        /**
         * 重载{@code getTargetRepository}类
         * @param metadata RepositoryInformation仓库类接口信息
         * @param em
         * @return 返回 BaseRepositoryImpl
         */
        @SuppressWarnings("unchecked")
		@Override
        protected SimpleJpaRepository<T, String> getTargetRepository(RepositoryInformation metadata, EntityManager em) 
        {
            return new BaseRepositoryImpl<T>((Class<T>) metadata.getDomainType(), em);
        }

        /**
         * 重载getRepository
         * @param metadata 仓库接口类元信息
         * @return BaseRepository.class
         */
        @Override
        protected Class<?> getRepositoryBaseClass(RepositoryMetadata metadata)
        {
            return BaseRepositoryImpl.class;
        }
    }
}
