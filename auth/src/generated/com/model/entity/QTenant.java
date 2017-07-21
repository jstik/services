package com.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTenant is a Querydsl query type for Tenant
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTenant extends EntityPathBase<Tenant> {

    private static final long serialVersionUID = 1043216195L;

    public static final QTenant tenant = new QTenant("tenant");

    public final QAbstractEntity _super = new QAbstractEntity(this);

    public final StringPath address = createString("address");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> created = _super.created;

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updated = _super.updated;

    public final ListPath<User, QUser> users = this.<User, QUser>createList("users", User.class, QUser.class, PathInits.DIRECT2);

    public final StringPath uuid = createString("uuid");

    public QTenant(String variable) {
        super(Tenant.class, forVariable(variable));
    }

    public QTenant(Path<? extends Tenant> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTenant(PathMetadata metadata) {
        super(Tenant.class, metadata);
    }

}

